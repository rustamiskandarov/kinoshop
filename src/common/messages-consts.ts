export const USER_NOT_FOUND = 'Пользователь не найден';
export const FIELD_MUST_BE_EMAIL_FORMAT = 'Поле должно быть в формате электронной почты например mail@mail.ru';
export const USER_HAS_BEEN_SUCCESSFULLY_UPDATED = 'Пользователь был успешно изменён';
export const ERROR_USER_UPDATED = 'Ошибка: Изменения пользователя не сохранены';
export const MUST_CONTAIN_MIN_CHARACTERS = (length: number)=>
`Должен содержать не менее ${length} `+ (length<2?'символа':'символов');
export const MUST_CONTAIN_MAX_CHARACTERS = (length: number) => 
`Должен содержать не более  ${length}` + (length < 2 ? 'символа' : 'символов');