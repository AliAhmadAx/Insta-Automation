import {AiOutlineCheckCircle} from "react-icons/ai"
const PlanDesc = (data) =>{
    console.log(data.data)
    return(
        <>
             {
                data.data.map((list)=>{
                    console.log(list)
                    return(
                    <div className="flex items-center mb-2">
                         <div className="text-emerald-500 ">
                            <AiOutlineCheckCircle />
                        </div>
                        <p className=" px-5 text-gray-500">{list}</p>
                    </div>
                    )
            })
            }
        </>
    )
}
export default PlanDesc;