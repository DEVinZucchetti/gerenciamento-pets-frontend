import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from "@vue/test-utils";

import Aprendizado from './Aprendizado.vue'

describe("Testa a tela de aprendizado", () => {

    it('Espera-se que que tela seja renderizada', () => {
        const component = mount(Aprendizado)
        expect(component).toBeTruthy()
    })

    it('Espera-se que ao submeter o formulário, o item seja adicionado para a lista', async () => {
        const component = mount(Aprendizado)
        // Busca um elemento no componente
        component.get("[data-test='input-description']").setValue("Estudar vue")
        // clicando no botão de cadastrar
        component.get("[data-test='submit-button']").trigger("submit")

        await flushPromises()

        const list = component.get("[data-test='list']")

        expect(list.text()).toContain("Estudar vue")
    })

    it('Espera-se que ao submeter o formulário, o item não seja adicionado', async () => {
        const component = mount(Aprendizado)
        // Busca um elemento no componente
        component.get("[data-test='input-description']").setValue("abc")
        // clicando no botão de cadastrar
        component.get("[data-test='submit-button']").trigger("submit")

        await flushPromises()

        expect(component.text()).toContain("A descrição é pequena demais.")

        const list = component.get("[data-test='list']")

        expect(list.text()).not.toContain("abc")
    })

})