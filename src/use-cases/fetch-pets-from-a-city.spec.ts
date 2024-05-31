import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { FetchPetsFromACityUseCase } from "./fetch-pets-from-a-city";
import { Decimal } from "@prisma/client/runtime/library";
import { NotFoundOrganizationInCityError } from "./errors/not-found-organization-error";

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetsFromACityUseCase
describe('fetch pet from a city (UNIT)', () => {

    beforeEach(() => {
        petRepository = new InMemoryPetRepository()
        organizationRepository = new InMemoryOrganizationRepository()

        organizationRepository.items.push({
            id: 'organization-01',
            address: 'rua 1',
            city: 'são paulo',
            email: '',
            manager_name: '',
            neighborhood: '',
            number: '',
            password_hash: '',
            phone: '',
            roadway: '',
            role: 'ORG',
            state: '',
        })

        organizationRepository.items.push({
            id: 'organization-02',
            address: 'rua 1',
            city: 'são paulo',
            email: '',
            manager_name: '',
            neighborhood: '',
            number: '',
            password_hash: '',
            phone: '',
            roadway: '',
            role: 'ORG',
            state: '',
        })

        sut = new FetchPetsFromACityUseCase(organizationRepository, petRepository)
    })

    it('should be possible to find pets from a city', async () => {


        petRepository.items.push({
            id: 'pet-01',
            about: 'um  dog legal',
            age: 'FILHOTE',
            level_environment: 'BAIXO',
            level_independence: 'ALTO',
            name: 'pet',
            organization_id: 'organization-01',
            size: 'PEQUENO',
            image_url: [],
            requirement: []
        })

        petRepository.items.push({
            id: 'pet-02',
            organization_id: 'organization-02',
            about: 'um  cat legal',
            age: 'FILHOTE',
            level_environment: 'BAIXO',
            level_independence: 'ALTO',
            name: 'pet',
            size: 'PEQUENO',
            image_url: [],
            requirement: []
        })

        const { pets } = await sut.execute({ cityName: 'são paulo' })
        expect(pets).toEqual([
            expect.objectContaining({ id: 'pet-01', organization_id: 'organization-01', }),
            expect.objectContaining({ id: 'pet-02', organization_id: 'organization-02', }),
        ])
    })


    it('It should not be possible to find pets from city-name-invalid', async () => {
        await expect(() => sut.execute({ cityName: '' })).rejects.toBeInstanceOf(NotFoundOrganizationInCityError)

    })
})