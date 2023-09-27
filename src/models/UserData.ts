// public string? FirstName { get; set; }

//     public string? LastName { get; set; }

//     public string? Gender { get; set; }

//     public DateTime? Dob { get; set; }

//     public string? Email { get; set; }

//     public long? PhoneNumber { get; set; }

//     public byte[]? Password { get; set; }

//     public byte? RoleId { get; set; }

//     public DateTime? CreatedDate { get; set; }

//     public DateTime? ModifiedDate { get; set; }

//     public DateTime? LastLoggedIn { get; set; }

//     public bool? IsDeleted { get; set; }

//     public int? AddressId { get; set; }

//     public short? OrderCount { get; set; }

//     public byte[]? ProfilePic { get; set; }
export interface UserData{
    firstName:string;
    lastName:string;
    gender:string;
    DOB:Date;
    email:string;
    password:string;
    phoneNumber:number;
    // profilePic:string;
    // profilePic:Uint8Array

}