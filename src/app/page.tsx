import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <p>Check the text editor <Link href={'/dashboard'} className="text-blue-800 cursor-pointer underline">here</Link></p>
  );
}
