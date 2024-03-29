
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

/* Configuração do vuetify */
import { createVuetify } from 'vuetify' // obrigatório
import * as components from 'vuetify/components' // obrigatório
import * as directives from 'vuetify/directives' // obrigatório

const vuetify = createVuetify({ // obrigatório
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill') // obrigatório

/* FIM DA CONFIGURACAO */

import FormPet from './FormPet.vue'
import { concatId } from '@/utils/tests/getComponent'

import SpecieService from '@/services/SpecieService'
import RaceService from '@/services/RaceService'
import PetService from '@/services/PetService'

describe("Tela de formulário de pet", () => {

    vi.spyOn(SpecieService, 'getAllSpecies').mockResolvedValue([
        {
            id: 1,
            name: 'Gato'
        },
        {
            id: 2,
            name: 'Cachorro'
        }
    ])

    vi.spyOn(RaceService, 'getAllRaces').mockResolvedValue([
        {
            id: 1,
            name: 'Caramelo'
        },
        {
            id: 2,
            name: 'RotWeiler'
        }
    ])

    it("Espera-se que a tela seja renderizada", () => {
       const component = mount(FormPet, {
            global: {
                plugins: [vuetify]
            }
        })
        
        expect(component).toBeTruthy()
    })

    it("Espera-se que seja enviando corretamente a submissão do formulário", async () => {
        
        const spyCreatePet = vi.spyOn(PetService, 'createPet').mockResolvedValue({})

        const component = mount(FormPet, {
             global: {
                 plugins: [vuetify]
             }
         })

         await flushPromises()
         
        component.getComponent(concatId('input-name')).setValue("Toto")
        component.getComponent(concatId('input-age')).setValue("12")
        component.getComponent(concatId('input-weight')).setValue("4.5")

        component.getComponent(concatId("select-size")).setValue("LARGE")
        component.getComponent(concatId("select-specie")).setValue("2")
        component.getComponent(concatId("select-race")).setValue("1")

        component.getComponent(concatId('submit-button')).trigger("submit")

        expect(spyCreatePet).toBeCalled()
        
       /* expect(spyCreatePet).toBeCalledWith({
            // ........
        })
        */
     })

     it('Espera-se que mostre um erro ao enviar o formulário sem um nome', async () => {

        const component = mount(FormPet, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        component.getComponent(concatId('input-age')).setValue("12")
        component.getComponent(concatId('input-weight')).setValue("4.5")
        component.getComponent(concatId("select-size")).setValue("LARGE")
        component.getComponent(concatId("select-specie")).setValue("2")
        component.getComponent(concatId("select-race")).setValue("1")

        component.getComponent(concatId('submit-button')).trigger("submit")

        await flushPromises() // obrigatorio após a submissão

        expect(component.text()).toContain("O nome é obrigatório")

     })

})

