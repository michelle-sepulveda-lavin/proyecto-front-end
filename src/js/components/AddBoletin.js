import React from 'react';
import { useForm } from 'react-hook-form'

const AddBoletin = (props) => {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        console.log(data)

        props.addboletin(data)
        e.target.reset();
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Asunto</label>
                <input type="text" name="asunto" ref={
                    register({
                        required: {
                            value: true,
                            message: 'Campo Requerido'
                        }
                    })
                } />
                <div>
                    {errors?.asunto?.message}
                </div>
                <label>Body</label>
                <input type="text" name="body" ref={
                    register({
                        required: {
                            value: true,
                            message: 'Campo Requerido'
                        }
                    })
                } />
                <div>
                    {errors?.body?.message}
                </div>
                <button>Agregar nuevo Boletin</button>
            </form>
        </>
    )
};

export default AddBoletin;