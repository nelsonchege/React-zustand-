import {
  Flex,
  Heading,
  IconButton,
  Link,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaTwitter,
} from "react-icons/fa";
import AddTask from "./components/AddTask";
import TaskList from "./components/tasks";
import { useToDoStore } from "./stores/useToDoStore";

function App() {
  const toast = useToast();
  const tasks = useToDoStore((state) => state.todos);
  const setTasks = useToDoStore((state) => state.addTodos);
  const deleteTaskAll = useToDoStore((state) => state.deleteAllTodos);
  const deleteTask = useToDoStore((state) => state.deleteSingleTodo);

  function checkTask(id) {
    const newTasksCheck = tasks.map((task) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });

    setTasks(newTasksCheck);
  }

  function updateTask(id, body, onClose) {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Enter Your Task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const newTasksUpdate = tasks.map((task) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  }

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4} minH="100vh" pb={28}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />

      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300, blue.500)"
        bgClip="text"
      >
        To Do List
      </Heading>
      <AddTask addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />

      <Flex position="absolute" bottom="5">
        <Link href="https://github.com/raminhuk" target="_blank">
          <IconButton icon={<FaGithub />} isRound="true" size="md" m="1" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/fabio-junior-raminhuk-740669121/"
          target="_blank"
        >
          <IconButton icon={<FaLinkedin />} isRound="true" size="md" m="1" />
        </Link>
        <Link href="https://www.instagram.com/fabiormk/" target="_blank">
          <IconButton icon={<FaInstagram />} isRound="true" size="md" m="1" />
        </Link>
        <Link href="https://twitter.com/fabio_rmk" target="_blank">
          <IconButton icon={<FaTwitter />} isRound="true" size="md" m="1" />
        </Link>
        <Link href="https://www.facebook.com/fabio.raminhuk" target="_blank">
          <IconButton icon={<FaFacebook />} isRound="true" size="md" m="1" />
        </Link>
      </Flex>
    </VStack>
  );
}

export default App;
