import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Box, Button, Group } from "@mantine/core";
import { Input } from "../../UI/Input";

import styles from './AddCardForm.module.css'
import { useForm } from "@mantine/form";
import { CardType } from "../../../shared/cardType";

export const AddCardForm: FC = () => {
  const [disabled, setDisabled] = useState(true)

  const form = useForm<CardType>({
    initialValues: {
      cardNumber: '',
      expirationDate: '',
      CVV: '',
      amount: 0
    },

    validate: {
      cardNumber: (value: string) => /^\d+$/.test(value) ? null : 'Невалидный номер карты. Номер карты должен быть числом',
      expirationDate: (value: string) =>  /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/.test(value) ? null : 'Невалидная дата. Формат даты должен быть MM/YYYY',
      CVV: (value: string) => /^\d+$/.test(value) ? null : 'Код безопасности должен быть числом'
    },
    initialErrors: {
      cardNumber: 'Невалидный номер карты. Номер карты должен быть числом'
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(form.errors)
    console.log(form.validateField('cardNumber'))
    form.setFieldValue('cardNumber', event.target.value)
    form.validateField('cardNumber')
  }

  const handleSubmit = (value: CardType) => {
    console.log(value)
  }

  return (
    <Box sx={{
      maxWidth: 500,
      border: '1px solid rgba(0, 0, 0, 0.1)',
      padding: '27px 28px 28px 27px',
      borderRadius: '10px'
    }} mx='auto' mt={50}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Input
            label='Номер карты'
            placeholder='Введите номер карты'
            type='text'
            handleChange={handleChange}
            minLength={16} maxLength={16} name='cardNumber' required
          />
          <Input
            label='MM/YYYY'
            placeholder='Введите с'
            type='text'
            handleChange={handleChange}
            {...form.getInputProps('expirationDate')}
            name='expirationDate'
            required
          />
          <Box sx={{ width: '60px' }}>
            <Input
              label='CVV'
              type='text'
              handleChange={handleChange}
              minLength={3}
              maxLength={3}
              {...form.getInputProps('CVV')}
              width={'20px'}
              name='CVV'
              required
            />
          </Box>
          <Input
            label='Сумма'
            placeholder='Введите сумму денег для оплаты'
            type='number'
            name='amount'
            required
          />
          <Group position="right" mt="md">
            <Button type="submit" disabled={disabled}>Submit</Button>
          </Group>
        </Box>
      </form>
    </Box>
  )
}