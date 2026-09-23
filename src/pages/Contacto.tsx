import { useState, type FormEvent } from "react";
import PageHero from "../components/PageHero";
import { contactInfo, interestAreas } from "../data/content";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim() ?? "";
    const phone = data.get("phone")?.toString().trim() || "-";
    const email = data.get("email")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() || "-";
    const area = data.get("area")?.toString().trim() || "-";
    const message = data.get("message")?.toString().trim() || "-";

    const text = [
      "Nueva consulta desde el sitio web:",
      "",
      `Nombre y apellido: ${name}`,
      `Teléfono: ${phone}`,
      `Email: ${email}`,
      `Empresa: ${company}`,
      `Área de interés: ${area}`,
      `Consulta: ${message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Completá el formulario"
        subtitle="Te contestaremos a la brevedad. Muchas gracias."
        image="/images/contacto.jpg"
      />

      <section className="py-20 md:py-28">
        <div className="container-px max-w-2xl mx-auto">
          {sent ? (
            <div className="border border-line rounded-2xl p-10 md:p-14 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center text-xl mb-5">✓</div>
              <h3 className="font-display text-2xl font-semibold">¡Ya casi!</h3>
              <p className="mt-3 text-mute max-w-xs">
                Abrimos WhatsApp con tu consulta redactada. Solo confirmá el envío desde ahí para que te respondamos.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-line rounded-2xl p-7 md:p-10 grid gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nombre y apellido" name="name" required placeholder="Tu nombre y apellido" />
                <Field label="Teléfono" name="phone" type="tel" required placeholder="+54 9 11 0000 0000" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email" name="email" type="email" required placeholder="tu@email.com" />
                <Field label="Empresa" name="company" placeholder="Nombre de tu empresa" />
              </div>

              <label className="block">
                <span className="text-xs font-semibold tracking-wide uppercase text-mute-2">Área de interés</span>
                <select
                  name="area"
                  className="mt-2 w-full border border-line rounded-lg bg-paper px-4 py-3 text-sm focus:outline-none focus:border-ink transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccioná un área
                  </option>
                  {interestAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold tracking-wide uppercase text-mute-2">Consulta / comentario</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Contanos brevemente tu situación..."
                  className="mt-2 w-full border border-line rounded-lg bg-paper px-4 py-3 text-sm focus:outline-none focus:border-ink transition-colors resize-none"
                />
              </label>

              <button type="submit" className="btn-ink justify-center mt-1">
                Enviar por WhatsApp
                <span aria-hidden>→</span>
              </button>
              <p className="text-[0.72rem] text-mute-2 text-center -mt-1">
                Te vamos a redirigir a WhatsApp con la consulta ya redactada.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wide uppercase text-mute-2">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-line rounded-lg bg-paper px-4 py-3 text-sm focus:outline-none focus:border-ink transition-colors"
      />
    </label>
  );
}
