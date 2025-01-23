export default function Footer () {
    return (
        <footer className="mt-5 shadow p-5 bg-dark text-light d-flex flex-column align-items-center justify-content-center">
            <div className="text-center">
                <div className="text-light">
                    If you encounter any bugs or issues, please email me at{" "}
                    <a className="text-light" href="https://mail.google.com/mail/?view=cm&fs=1&to=aceamable4@gmail.com" target="_blank" rel="noopener noreferrer">
                        aceamable4@gmail.com
                    </a>.
                </div>
                <div className="mt-2">
                    &copy; 2025 UMIS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}