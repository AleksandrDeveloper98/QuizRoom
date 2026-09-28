import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const titleId = "not-found-page";
  return (
    <section className="not-found-page" aria-labelledby={titleId}>
      <h1 className="not-found-page__title h3" id={titleId}>
        Страница не найдена...
      </h1>
    </section>
  );
};

export default NotFoundPage;
