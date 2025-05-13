import { FaRegUser } from "react-icons/fa"
import { FcGraduationCap } from "react-icons/fc"
import { CiWarning } from "react-icons/ci";



export const TotalStats = () => {
    return (

        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="min-w-[284px] h-full border-2 rounded-xl border-b-4 flex flex-col items-center justify-between p-3">
                <div className="flex text-3xl justify-center items-center font-bold mt-3 gap-2">
                    <FcGraduationCap />
                    <h1 className="text-neutral-800">{32}</h1>
                </div>
                <p className="text-neutral-700 text-center mt-3">Total Course</p>
            </div>

            <div className="min-w-[284px] h-full border-2 rounded-xl border-b-4 flex flex-col items-center justify-between p-3">
                <div className="flex text-3xl justify-center items-center font-bold mt-3 gap-2">
                    <FaRegUser /> 
                    <h1 className="text-neutral-800">{734}</h1>
                </div>
                <p className="text-neutral-700 text-center mt-3">Total Users</p>
            </div>

            <div className="min-w-[284px] h-full border-2 rounded-xl border-b-4 flex flex-col items-center justify-between p-3">
                <div className="flex text-3xl justify-center items-center font-bold mt-3 gap-2">
                    <FcGraduationCap />
                    <h1 className="text-neutral-800">{32}</h1>
                </div>
                <p className="text-neutral-700 text-center mt-3">Total Course</p>
            </div>

            <div className="min-w-[284px] h-full border-2 rounded-xl border-b-4 flex flex-col items-center justify-between p-3
            bg-red-400">
                <div className="flex text-3xl justify-center items-center font-bold mt-3 gap-2">
                <CiWarning />
                    <h1 className="text-neutral-800">{32}</h1>
                </div>
                <p className="text-neutral-700 text-center mt-3">Total Issue</p>
            </div>
        </div>
    )

}