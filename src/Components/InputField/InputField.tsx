import './InputField.css'


const InputField: React.FC = () => {
    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
            />
            <button>Shorten Link</button>
        </div>
    )
}

export default InputField

// ### Shorten a Link
// - **POST** `/api/v1/users/:id/links?link={original link}`
//   - Description: Creates a shortened link associated with an exisiting user
//   - Example Request: POST `https://turlink-be-53ba7254a7c1.herokuapp.com/users/1/links?link=testlink.com`
//   - Successful Response (200 OK):
//     ```json
//     {
//       "data": {
//           "id": "1",
//           "type": "link",
//           "attributes": {
//               "original": "testlink.com",
//               "short": "tur.link/4a7c204baeacaf2c",
//               "user_id": 1
//           }
//       }
//     }
//     ```
//   - Error Response (422 Unprocessable Entity) -- when original link isn't entered:
//     ```json
//     {
//       "errors": [
//           {
//               "status": "unprocessable_entity",
//               "message": "Original can't be blank"
//           }
//       ]
//     }
//     ```
//   - Error Response (404 Not Found) -- when user_id is not valid:
//   ```json
//   {
//     "errors": [
//         {
//             "status": "unprocessable_entity",
//             "message": "User must exist"
//         }
//     ]
//   }
//   ```




//   ### Return full link when short link is given
//   - **GET** `/api/v1/links?short={shortened link}`
//     - Description: Gets full link object when given shortened link
//     - Example Request: GET `https://turlink-be-53ba7254a7c1.herokuapp.com/links?short=tur.link/4a7c204baeacaf2c`
//     - Successful Response (200 OK):
//       ```json
//       {
//         "data": {
//             "id": "1",
//             "type": "link",
//             "attributes": {
//                 "original": "testlink.com",
//                 "short": "tur.link/4a7c204baeacaf2c",
//                 "user_id": 1
//             }
//         }
//       }
//       ```
//     - Error Response (404 Not Found) -- when shortened link is not entered or does not exist:
//     ```json
//     {
//       "errors": [
//           {
//               "message": "Record not found"
//           }
//       ]
//     }
//     ```
  