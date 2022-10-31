import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Calorie Tracker</title>
        <meta name="description" content="Track you daily calorie intake" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div className="grid grid-cols-[15rem_auto]">
            <div className="grid grid-rows-[3rem_auto]">
              <div className=" text-2xl text-cyan-600 p-2 border-b-2 border-cyan-600 border-opacity-20 ">
                Calorie Tracker
              </div>
              <div className="grid grid-rows-[3rem_auto]">
                <button 
                  onClick={() => {console.log("Add Entry Button Clicked!")}}
                  className="my-2 mx-12 rounded-2xl border-2 border-cyan-600 hover:bg-cyan-600 hover:text-cyan-50 text-cyan-600">
                  Add Entry
                </button>
                <JournalList/>
              </div>
            </div>
            <div className="m-5">
              test
            </div>
          </div>
      </main>
    </>
  );
};

export default Home;

function JournalList(){
  const data: string[] = ["28.10.2022", "29.10.2022", "30.10.2022"]

  return(
    <div className="flex flex-col text-center">
        {data.map(item => {
          return <div>{item}</div>
        })}
    </div>
  )

}

