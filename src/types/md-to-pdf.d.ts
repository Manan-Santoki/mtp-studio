declare module "md-to-pdf" {
  export type MarkdownContent =
    | string
    | {
        path?: string;
        content?: string;
      };

  export type MdToPdfOptions = {
    asBuffer?: boolean;
    css?: string;
    stylesheet?: string | string[];
    document_title?: string;
    pdf_options?: {
      format?: string;
      margin?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
      };
      printBackground?: boolean;
      displayHeaderFooter?: boolean;
    };
  };

  export type MdToPdfResult = {
    filename: string;
    content?: Buffer;
  };

  export function mdToPdf(
    content: MarkdownContent,
    options?: MdToPdfOptions,
  ): Promise<MdToPdfResult>;
}
