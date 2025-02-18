"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
    const {userId} = await auth();
    if(!userId) {
        throw new Error("You must be signed in to update your user");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });

    if(!user) {
        throw new Error("User not found");
    }

    try {
        const result = await db.$transaction(
          async (tx) => {
            //if industry exists
            let industryInsight = await tx.industryInsight.findUnique({
              where: {
                industry: data.industry,
              },
            });

            //if industry does not exist, create it with default values - will replace it ai later
            if (!industryInsight) {
              const insights = await generateAIInsights(data.industry);

              industryInsight = await db.industryInsight.create({
                data: {
                  industry: data.industry,
                  ...insights,
                  nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
              });
            }


            //update user
            const updatedUser = await tx.user.update({
              where: {
                id: user.id,
              },
              data: {
                industry: data.industry,
                experience: data.experience,
                bio: data.bio,
                skills: data.skills,
              },
            });

            return { updatedUser, industryInsight };
          },
          {
            timeout: 5000,
          }
        );

        return {
            success:true,
            ...result
        }
    } catch (error){
        console.log("Error updating user", error);
        throw new Error(`Error updating profile: ${error.message}`);

        
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if(!userId) {
        throw new Error("You must be signed in to update your user");
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select:{
                industry: true,
            }
        });
    
        return {
            isOnboarded: !!user?.industry
        }
    } catch (error) {
        console.log("Error getting user onboarding status", error);
        throw new Error("Error getting user onboarding status");
        
    }
}