import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { JournalEntry } from "@prisma/client";



const Home: NextPage = () => {
  // todo: trigger automatic rload after mutation
  const journalEntries = trpc.journalEntry.getAll.useQuery();
  const journalEntryCreate = trpc.journalEntry.create.useMutation();

  const addJournalEntry = () => {
    journalEntryCreate.mutate();
  }

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
              <div className="text-center text-2xl text-cyan-600 p-2 border-b-2 border-cyan-600 border-opacity-20 ">
                Calorie Tracker
              </div>
              <div className="grid grid-rows-[3rem_auto]">
                <button 
                  onClick={addJournalEntry}
                  className="my-2 mx-12 rounded-2xl border-2 border-cyan-600 hover:bg-cyan-600 hover:text-cyan-50 text-cyan-600">
                  Add Entry
                </button>
                <JournalList journalEntries={journalEntries.data ?? []} />
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

const JournalList: React.FC<{journalEntries:JournalEntry[]}> = ({journalEntries}) => {
  return(
    <div className="flex flex-col text-center">
        {journalEntries?.map((journalEntry, index) => {
          return <div key={index}>{journalEntry.journalDate?.toString() ?? `New JournalEntry #${index}`}</div>
        })}
    </div>
  )

}

