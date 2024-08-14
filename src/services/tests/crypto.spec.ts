// import { crypt, verifyPassword } from '../crypto.service';

// describe("test crypto", (): void => {
//   it("Should return a string", (): void => {
//     const password = "1234";
//     const hash = crypt(password);
  
//     expect(hash)
//     .toBe(
//       '9a58e92478bcd9c832328b97bd95b045f9028a4b1f133381207cb0edd27d617a8c458153a85d782bc97a1eb3831a7033f950'
//     );
//   })

//   it("Should return true", (): void => {
//     const passwordSaved = "1234";
//     const passwordTest = '1234'
//     const hash = crypt(passwordSaved);
//     const result = verifyPassword(passwordTest, hash);

//     expect(result).toBe(true);
//   });

//   it("Should return false", (): void => {
//     const passwordSaved = "1234";
//     const passwordTest = '1233'
//     const hash = crypt(passwordSaved);
//     const result = verifyPassword(passwordTest, hash);

//     expect(result).toBe(false);
//   });
// })


