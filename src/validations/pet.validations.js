import * as yup from 'yup';

export const schemaPetForm = yup.object().shape({
    name: yup
    .string()
    .required("O nome é obrigatório")
    .max(150, 'O nome é muito longo'),
    age: yup.number().integer("A idade deve ser um valor inteiro"),
    race_id: yup.string().required("A raça é obrigatória"),
    specie_id: yup.string().required("A espécie é obrigatória"),
    weight: yup.number("O valor deve ser um número").required("o peso é obrigatório"),
    size: yup.string().required("O tamanho é obrigatório")
}) 