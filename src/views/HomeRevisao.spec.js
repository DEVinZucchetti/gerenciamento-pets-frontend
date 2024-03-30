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

import Home from './Home.vue'
import SpecieService from '@/services/SpecieService'
import { concatId } from '@/utils/tests/getComponent'

describe("Tela Home", () => {

    vi.spyOn(SpecieService, 'getAllSpecies').mockResolvedValue(
        [
            {
                "id": 1,
                "name": "Caninos",
            },
            {
                "id": 2,
                "name": "Felinos",
            },
            {
                "id": 3,
                "name": "Bovinos",
            }
        ]
    )

    it("Espera-se que a tela seja renderizada", () => {
    
    
        const component = mount(Home, {
            global: {
                plugins: [vuetify]
            }
        })
        
        expect(component).toBeTruthy()
    })

    it("Espera-se que exiba 3 cards na tela", async () => {

        const component = mount(Home, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()
        
        const cards = component.findAll(concatId('card-item'))
        
        expect(cards).toHaveLength(3)

        expect(component.text()).toContain("Caninos")
        expect(component.text()).toContain("Felinos")
        expect(component.text()).toContain("Bovinos")
    })




})