import { describe, expect } from "vitest";
import { concatId } from "./getComponent";

describe('Função getComponent', () => {

    it("Espera-se que retorne o id correto", () => {
      
        const result = concatId("input-email")

        expect(result).toEqual("[data-test='input-email']")
    })
})