import GuestPlayerForm from "@/features/guest-session/ui/GuestPlayerForm";
import "./WelcomePage.scss";
import Logo from "@/shared/ui/Logo";

const WelcomePage = () => {
  const titleId = "welcome-page-title";

  return (
    <main className="welcome-page" aria-labelledby={titleId}>
      <div className="welcome-page__inner">
        <header className="welcome-page__header">
          <h1 className="welcome-page__title" id={titleId}>
            <Logo />
          </h1>
          <p className="welcome-page__subtitle">
            Собери друзей. Выбери тему. Докажи, кто знает больше.
          </p>
        </header>
        <GuestPlayerForm />
      </div>
    </main>
  );
};

export default WelcomePage;
