import Axios from "./axios";


export async function PublishCourse(id : string) {
            try {
                const response = await Axios.post(`/teacher/publish-course/${id}`)
               return {seuccess : response.data.success  , message : response.data.message};
            } catch (e) {
                console.log(e);
            }
  }

