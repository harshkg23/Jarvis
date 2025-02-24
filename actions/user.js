"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to update your user");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!data.industry) {
    throw new Error("Industry must be provided");
  }

  try {
    const result = await db.$transaction(async (tx) => {
      // Check if industry insight exists
      let industryInsight = await tx.industryInsight.findUnique({
        where: { industry: data.industry },
      });

      // If industry does not exist, generate AI insights
      if (!industryInsight) {
        const insights = await generateAIInsights(data.industry);

        industryInsight = await db.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
          },
        });
      }

      // Update user profile
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(`Error updating profile: ${error.message}`);
  }
}


export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}