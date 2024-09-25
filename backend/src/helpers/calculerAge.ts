export const  calculerAge=(birthDate:Date)=>{
    const parsedBirthDate = new Date(birthDate);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - parsedBirthDate.getFullYear();
    const monthDifference = today.getMonth() - parsedBirthDate.getMonth();

    // Adjust age if birth date has not occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < parsedBirthDate.getDate())) {
      age--;
    }

    return age;
}