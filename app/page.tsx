'use client'
import { useSession } from "./session-context";

export default function Home() {
  const session = useSession();
  const {logout} = useSession();
  return (
    <div className=" flex flex-col gap-2 justify-center text-center">
        {JSON.stringify(session)}
        {session&&(
          <button onClick={logout} className="bg-amber-300 p-3 rounded-2xl w-min m-auto cursor-pointer">LogOut</button>
        )}
    </div>
  );
}
