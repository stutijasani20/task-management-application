import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

import { fetchTasks } from "@/store";
import type { AppDispatch } from "@/store";
import { TaskList, Navigation } from "../components";

export default function TasksPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Task Management App - Client Side</title>
        <meta name="description" content="Manage your tasks efficiently (Client-side rendered)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <TaskList isServerSide={false} />
    </>
  );
}