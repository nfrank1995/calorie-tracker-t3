import { JournalEntry } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {

  const journalEntries = trpc.journalEntry.getAll.useQuery();

  const utils = trpc.useContext();

  const journalEntryAddMutation = trpc.journalEntry.create.useMutation({
    onSuccess(){
      utils.journalEntry.getAll.invalidate()
    }
  });

  
  const addJournalEntry = () => {
    journalEntryAddMutation.mutate();
  }

  return (
    <>
      <Head>
        <title>Calorie Tracker</title>
        <meta name="description" content="Track your daily calorie intake" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
            <div className="grid grid-rows-[3rem_auto]">
              <div className="text-2xl text-cyan-600 p-2 border-b-2 border-cyan-600 border-opacity-20 ">
                Calorie Tracker
              </div>
              <JournalList journalEntries={journalEntries.data ?? []}></JournalList>
              <AddJournalEntryButton addJournalEntry={addJournalEntry}></AddJournalEntryButton>
            </div>
      </main>
    </>
  );
};

export default Home;

const AddJournalEntryButton: React.FC<{addJournalEntry: Function}> = ({addJournalEntry}) => {

return <button className="text-cyan-600 rounded-xl font-bold border-cyan-600 border-2" onClick={() => addJournalEntry()}>Add Entry</button>
}

const JournalList: React.FC<{journalEntries: JournalEntry[]}> = ({journalEntries}) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-3">
      {journalEntries.map(() => {
        return <JournalEntryCard></JournalEntryCard>
      })}
    </div>
  )
}

const JournalEntryCard = () => {
  return (
  <>
    <div className="basis-1/4 rounded-2xl bg-cyan-400 bg-opacity-20 p-3 shadow-xl hover:scale-105">
      <h2 className="text-xl">Fr. 11.11.2022</h2> 
      <div className="flex flex-row justify-between items-end">
        <div>71,2 kg</div>
        <div className="text-lg font-medium"> Kcal: 2386</div>
      </div>
    </div> 
  </>
  )
}