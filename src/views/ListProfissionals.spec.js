import { describe, it, expect, vi } from "vitest";
import ListProfissionals from './ListProfissionals.vue'
import { flushPromises, mount } from "@vue/test-utils";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ProfessionalService from "@/services/ProfessionalService";
import { concatId } from "@/utils/tests/getComponent";

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela lista de veterinários", () => {

    vi.spyOn(ProfessionalService, 'getAllProfessionals')
        .mockResolvedValue([
            {
                "id": 1,
                "speciality": "Pediatria",
                "register": "10002000",
                "people": {
                    "id": 1,
                    "name": "Doutor Douglas",
                }
            },
            {
                "id": 2,
                "speciality": "Pediatria",
                "register": "234212",
                "people": {
                    "id": 2,
                    "name": "Doutor Carlos",
                }
            },
            {
                "id": 3,
                "speciality": "Pediatria",
                "register": "434234",
                "people": {
                    "id": 3,
                    "name": "Doutor Cavalcante",
                }
            }
        ])

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(ListProfissionals, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera que exiba a quantidade de linhas na tabela corretamente", async () => {
        const component = mount(ListProfissionals, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        expect(component.findAll(concatId("row-table"))).toHaveLength(3)
    })


    it("Espera que exiba pesquisa uma palavra, seja enviado o valor na função", async () => {

        const getAllProfessionals = vi.spyOn(ProfessionalService, 'getAllProfessionals').mockRejectedValue([])

        const component = mount(ListProfissionals, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        component.getComponent(concatId("input-text")).setValue("Renata")
        component.getComponent(concatId("input-text")).trigger("submit")

        expect(getAllProfessionals).toBeCalledWith("Renata")
    })


})