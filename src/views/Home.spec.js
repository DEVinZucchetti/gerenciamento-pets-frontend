import { describe, it, expect, vi } from "vitest";
import Home from './Home.vue'
import { flushPromises, mount } from "@vue/test-utils";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SpecieService from "@/services/SpecieService";

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela Home", () => {
     
     vi.spyOn(SpecieService, 'getAllSpecies').mockResolvedValue([
        {
            id: 1,
            name: 'Cachorro'
        },
        {
            id: 2,
            name: 'Gato'
        },
        {
            id: 3,
            name: 'Aves'
        }
     ])

    it("Espera-se que a tela seja renderizada", () => {
    
    
        const component = mount(Home, {
            global: {
                plugins: [vuetify]
            }
        })
        
        expect(component).toBeTruthy()
    })
    
    it("Espera-se exiba na tela os nomes das espécies", async () => {
        const component = mount(Home, {
            global: {
                plugins: [vuetify]
            }
        })
        
        await flushPromises()
        expect(component.text()).toContain("Gato")
        expect(component.text()).toContain("Cachorro")
        expect(component.text()).toContain("Aves")
    })
    
    it("Espera-se que exiba na tela 3 cards", async () => {
        const component = mount(Home, {
            global: {
                plugins: [vuetify]
            }
        })
        
        await flushPromises()
        
        const cards = component.findAll("[data-test='card-item']")
        
        expect(cards).toHaveLength(3)
    })
})