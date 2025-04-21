import Link from "next/link";

export default function Page() {
  return (
    <div className='w-full h-full flex justify-center items-center text-[2rem]'>
        <p>Check the text editor <Link href={'/dashboard'} className="text-blue-800 cursor-pointer underline">here</Link></p>
    </div>
  );
}
