import { Resend } from "resend";

export const runtime = "nodejs";

const contactRecipient = "kaua.cantanhede.santos@gmail.com";
const contactSender = "Portfólio <onboarding@resend.dev>";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldLimits = {
  name: 120,
  email: 254,
  message: 5_000,
} as const;

function readField(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function isValidSubmission(name: string, email: string, message: string) {
  return (
    name.length > 0 &&
    name.length <= fieldLimits.name &&
    email.length > 0 &&
    email.length <= fieldLimits.email &&
    emailPattern.test(email) &&
    message.length > 0 &&
    message.length <= fieldLimits.message
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const message = readField(formData, "message");

  if (!isValidSubmission(name, email, message)) {
    return Response.json(
      { error: "Invalid contact form submission." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const subjectName = name.replace(/[\r\n]+/g, " ");
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: contactSender,
      to: contactRecipient,
      replyTo: email,
      subject: `Nova mensagem do portfólio — ${subjectName}`,
      text: `Nova mensagem do portfólio

Nome: ${name}
E-mail: ${email}

Mensagem:
${message}`,
      html: [`
            <!DOCTYPE html>
            <html lang="pt-BR">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Nova mensagem do portfólio</title>
              </head>

              <body style="
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
                font-family: Arial, Helvetica, sans-serif;
                color: #1f2937;
              ">
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="padding: 32px 16px;"
                >
                  <tr>
                    <td align="center">

                      <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          max-width: 640px;
                          background: #ffffff;
                          border: 1px solid #e5e7eb;
                          border-radius: 12px;
                          overflow: hidden;
                        "
                      >

                        <!-- Header -->
                        <tr>
                          <td style="
                            padding: 28px 32px;
                            background: #111827;
                            color: #ffffff;
                          ">
                            <p style="
                              margin: 0 0 8px;
                              font-size: 12px;
                              font-weight: 600;
                              letter-spacing: 1.5px;
                              text-transform: uppercase;
                              color: #9ca3af;
                            ">
                              KANT-SDEV PORTFOLIO
                            </p>

                            <h1 style="
                              margin: 0;
                              font-size: 24px;
                              line-height: 1.3;
                              color: #ffffff;
                            ">
                              Nova mensagem recebida
                            </h1>
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding: 32px;">

                            <p style="
                              margin: 0 0 28px;
                              font-size: 16px;
                              line-height: 1.6;
                              color: #4b5563;
                            ">
                              Você recebeu uma nova mensagem através do formulário
                              de contato do seu portfólio.
                            </p>

                            <!-- Contact Info -->
                            <table
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                              style="
                                margin-bottom: 28px;
                                border: 1px solid #e5e7eb;
                                border-radius: 8px;
                              "
                            >

                              <tr>
                                <td style="
                                  padding: 16px;
                                  border-bottom: 1px solid #e5e7eb;
                                ">
                                  <p style="
                                    margin: 0 0 4px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                    color: #6b7280;
                                  ">
                                    Nome
                                  </p>

                                  <p style="
                                    margin: 0;
                                    font-size: 16px;
                                    font-weight: 600;
                                    color: #111827;
                                  ">
                                    ${safeName}
                                  </p>
                                </td>
                              </tr>

                              <tr>
                                <td style="padding: 16px;">
                                  <p style="
                                    margin: 0 0 4px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                    color: #6b7280;
                                  ">
                                    E-mail
                                  </p>

                                  <a
                                    href="mailto:${safeEmail}"
                                    style="
                                      font-size: 16px;
                                      color: #2563eb;
                                      text-decoration: none;
                                    "
                                  >
                                    ${safeEmail}
                                  </a>
                                </td>
                              </tr>

                            </table>

                            <!-- Message -->
                            <div style="
                              padding: 20px;
                              background: #f9fafb;
                              border-left: 4px solid #2563eb;
                              border-radius: 4px;
                            ">
                              <p style="
                                margin: 0 0 10px;
                                font-size: 12px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                color: #6b7280;
                              ">
                                Mensagem
                              </p>

                              <p style="
                                margin: 0;
                                font-size: 16px;
                                line-height: 1.7;
                                color: #374151;
                                white-space: pre-line;
                              ">
                                ${safeMessage}
                              </p>
                            </div>

                            <!-- CTA -->
                            <div style="margin-top: 32px;">
                              <a
                                href="mailto:${safeEmail}"
                                style="
                                  display: inline-block;
                                  padding: 12px 20px;
                                  background: #111827;
                                  color: #ffffff;
                                  text-decoration: none;
                                  border-radius: 6px;
                                  font-size: 14px;
                                  font-weight: 600;
                                "
                              >
                                Responder mensagem →
                              </a>
                            </div>

                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="
                            padding: 20px 32px;
                            border-top: 1px solid #e5e7eb;
                            background: #f9fafb;
                          ">
                            <p style="
                              margin: 0;
                              font-size: 12px;
                              color: #9ca3af;
                            ">
                              Mensagem enviada automaticamente pelo formulário de contato do portfólio.
                            </p>
                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `
      ].join(""),
    });

    if (error) {
      console.error("Resend contact email failed:", error);
      return Response.json({ error: "Unable to send email." }, { status: 502 });
    }

    return Response.json({ id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("Unexpected contact email failure:", error);
    return Response.json({ error: "Unable to send email." }, { status: 500 });
  }
}
