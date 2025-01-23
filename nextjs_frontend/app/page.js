import Navbar from "@/components/navBar";
import Spinner from "@/components/spinners";
import Users from "@/components/userTable";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <section className="vh-100 bg-393E46">
        <div className="p-0 h-100">
          {/* Navbar */}
          <Navbar/>
          
          {/* Body */}
          <Suspense fallback={<Spinner/>}>
            <div className="h-90">
              <Users/>
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
