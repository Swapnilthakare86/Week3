export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-3 text-center">
        <p className="mb-1 fw-bold">Employee Management System</p>
        <p className="mb-0">
          © {new Date().getFullYear()} EMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}