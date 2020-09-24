import React from 'react';
import { useForm } from 'react-hook-form'

const EditBoletin = (props) => {

    //console.log(props.currentBoletin)

    const { register, errors, handleSubmit, setValue } = useForm({
        defaultValues: props.currentBoletin
    });

    setValue('asunto', props.currentBoletin.asunto);
    setValue('body', props.currentBoletin.body);

    const onSubmit = (data, e) => {
        console.log(data)
        data.id = props.currentBoletin.id
        props.updateBoletin(props.currentBoletin.id, data)

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
                <button >Editar Boletin</button>
            </form>
        </>
    )
};

export default EditBoletin;