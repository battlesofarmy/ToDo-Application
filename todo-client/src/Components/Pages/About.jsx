export default function About() {
  return (
    <div className="container py-20">
      <h2 className="text-4xl">About This App</h2>
      <p className="pt-5">
        A sleek and intuitive web application designed to help users manage
        tasks efficiently. Features include adding, editing, and deleting tasks,
        organizing them with due dates, and marking tasks as completed. Built
        with modern web technologies, the app ensures a responsive and
        user-friendly experience. The project showcases proficiency in front-end
        development, state management, and user interface design.
      </p>
      <h4 className="text-lg">Key features include:</h4>

        <ul style={{listStyleType: 'circle'}} className="ml-8 my-5">
          <li className="my-2">Task Management: Add, edit, delete, and mark tasks as completed.</li>
          <li className="my-2">Organizational Tools: Categorize tasks, set priorities, and add due dates.</li>
          <li className="my-2">User-Friendly Interface: Simple, intuitive design for effortless navigation.</li>
          <li className="my-2">Real-Time Updates: Changes sync instantly for a smooth experience.</li>
          <li className="my-2">Built with Modern Technologies: Utilizes [React/Angular/Vue] for front-end, [Node.js/Django/etc.] for the backend, and [MongoDB/MySQL/etc.] for data persistence.</li>
        </ul> 

      <p>
        This project highlights expertise in full-stack web development, UI/UX
        design, and responsive design principles, making it a perfect addition
        to any productivity enthusiasts toolkit.
      </p>
    </div>
  );
}
