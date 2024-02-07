import { describe, expect, it, vi } from 'vitest'
import Login from './Login.vue'
import { flushPromises, mount } from '@vue/test-utils'

import AuthenticationService from '../services/AuthenticationService'

/*
FAZER ISSO SOMENTE SE FOR USAR VUETIFY 
*/
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de login', () => {

    it('Espera-se que a tela seja renderizada', () => {
        const component = mount(Login, {
            global: {
                plugins: [vuetify]
            }
        })
        expect(component).toBeTruthy()
    })

    it('Espera-se que ao submeter o formulário, seja redirecionado para tela home', () => {

        const login = vi.spyOn(AuthenticationService, 'login').mockResolvedValue({
            data: {
                token: 'token',
                permissions: []
            }
        })

        const component = mount(Login, {
            global: {
                plugins: [vuetify]
            }
        })

        // GET quando for algo nativo do html
        // getComponente quando for um componente externo
        component.getComponent("[data-test='input-email']").setValue("h@gmail.com")
        component.getComponent("[data-test='input-password']").setValue("12345678")
        component.getComponent("[data-test='submit-button']").trigger("submit")
        
        expect(login).toBeCalledTimes(1)
        expect(login).toBeCalledWith({email: 'h@gmail.com', password:  '12345678'})

    })
    
    it('Espera-se que ao submeter o formulário, receba uma mensagem de erro', async () => {

        vi.spyOn(AuthenticationService, 'login').mockRejectedValue(new Error())

        const component = mount(Login, {
            global: {
                plugins: [vuetify]
            }
        })

        // GET quando for algo nativo do html
        // getComponente quando for um componente externo
        component.getComponent("[data-test='input-email']").setValue("h@gmail.com")
        component.getComponent("[data-test='input-password']").setValue("12345678")
        component.getComponent("[data-test='submit-button']").trigger("submit")
        
        await flushPromises()
        
        expect(component.text()).toContain("Houve um erro ao realizar o login")
    })

})