import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: any;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </div>
  );
}
