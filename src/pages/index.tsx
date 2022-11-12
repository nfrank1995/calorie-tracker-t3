import { JournalEntry } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const buttonClassString = "text-cyan-600 rounded-lg border-cyan-600 border-2 active:scale-105 px-2";

const Home: NextPage = () => {

  const journalEntries = trpc.journalEntry.getAll.useQuery();

  const utils = trpc.useContext();

  const journalEntryAddMutation = trpc.journalEntry.create.useMutation({
    onSuccess(){
      utils.journalEntry.getAll.invalidate();
    }
  });

  const journalEntryDeleteMutation = trpc.journalEntry.deleteWithId.useMutation({
    onSuccess(){
      utils.journalEntry.getAll.invalidate();
    }
  });

  
  const addJournalEntry = () => {
    journalEntryAddMutation.mutate();
  }

  const deleteJournalEntry = (id: string) => {
    console.log(`Delete entry with id: ${id}`)
    journalEntryDeleteMutation.mutate({id})
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
              <div className="text-2xl text-cyan-600 p-2 border-b-2 border-cyan-600 border-opacity-20 font-bold text-center">
                Calorie Tracker
              </div>
              <JournalList deleteEntry={deleteJournalEntry} journalEntries={journalEntries.data ?? []}></JournalList>
              <AddJournalEntryButton addJournalEntry={addJournalEntry}></AddJournalEntryButton>
            </div>
      </main>
    </>
  );
};

export default Home;

const AddJournalEntryButton: React.FC<{addJournalEntry: Function}> = ({addJournalEntry}) => {

return <button className={buttonClassString} onClick={() => addJournalEntry()}>Add Entry</button>
}

const JournalList: React.FC<{journalEntries: JournalEntry[], deleteEntry: Function}> = ({journalEntries, deleteEntry}) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-3">
      {journalEntries.map((journalEntry) => {
        return <JournalEntryCard journalEntry={journalEntry} deleteEntry={deleteEntry} key={journalEntry.id}></JournalEntryCard>
      })}
    </div>
  )
}

const JournalEntryCard: React.FC<{journalEntry: JournalEntry, deleteEntry: Function}> = ({journalEntry, deleteEntry}) => {
  
  function handleClick(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    deleteEntry(journalEntry.id);
  }
  
  return (
  <>
    <div className="basis-1/4 rounded-lg text-cyan-600 border-cyan-600 border p-3 shadow-lg">
        <div className="text-xl mb-2 font-bold">Fr. 11.11.2022</div> 
        <div>71,2 kg</div>
        <div>2386 kcal</div>
      <div className="flex flex-row space-x-2 justify-end items-end">
        <button onClick={handleClick} className={buttonClassString}>Delete</button>
        <button className={buttonClassString}>Edit</button>
      </div>
    </div> 
  </>
  )
}