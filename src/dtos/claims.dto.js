export default class ClaimsDTO {
    constructor(claimsDto) {
        this.id = claimsDto._id,
        this.role = claimsDto.role
    }
}