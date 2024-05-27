import { Prisma, $Enums } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PetRepository } from "../pet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data: {
                name: data.name,
                about: data.about,
                age: data.age,
                environment: data.environment,
                size: data.size,
                image_url: data.image_url,
                requirement: data.requirement,
                level_independence: data.level_independence,
            }
        })
    }
}