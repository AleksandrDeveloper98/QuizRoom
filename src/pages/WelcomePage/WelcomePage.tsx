import GuestPlayerForm from "@/features/createGuestSession/ui/GuestPlayerForm";
import "./WelcomePage.scss";

const WelcomePage = () => {
  const titleId = "welcome-page-title";

  return (
    <section className="welcome-page" aria-labelledby={titleId}>
      <div className="welcome-page__inner">
        <div className="welcome-page__header">
          <h1 className="welcome-page__title" id={titleId}>
            Quiz<span className="welcome-page__title-half">Room</span>
          </h1>
          <p className="welcome-page__subtitle">
            Собери друзей. Выбери тему. Докажи, кто знает больше.
          </p>
        </div>
        <GuestPlayerForm />
      </div>
    </section>
  );
};

export default WelcomePage;
