import type { GetServerSideProps } from "next";
import Head from "next/head";
import { TaskList, Navigation } from "../components";
import type { Task } from "@/src/types/task";

interface HomeProps {
  initialTasks: Task[];
}

export default function Home({ initialTasks }: HomeProps) {
  return (
    <>
      <Head>
        <title>Task Management App - Server Side</title>
        <meta name="description" content="Manage your tasks efficiently (Server-side rendered)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <TaskList initialTasks={initialTasks} isServerSide={true} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/tasks`);
    const initialTasks = await response.json();

    return {
      props: {
        initialTasks,
      },
    };
  } catch (error) {
    console.error("Failed to fetch initial tasks:", error);
    return {
      props: {
        initialTasks: [],
      },
    };
  }
};