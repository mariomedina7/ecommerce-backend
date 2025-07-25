 export default class UserDTO {
    constructor(userDto) {
        this.id = userDto._id,
        this.first_name = userDto.first_name,
        this.last_name = userDto.last_name,
        this.age = userDto.age,
        this.email = userDto.email,
        this.role = userDto.role,
        this.cart = userDto.cart,
        this.createdAt  = userDto.createdAt,
        this.updatedAt  = userDto.updatedAt
    }
}