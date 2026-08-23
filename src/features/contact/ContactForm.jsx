/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

// The single contact form, mounted in two places: the home page section and the
// /contact route. It is deliberately one component rather than two copies — a
// forked form is how the two drift apart and one of them quietly stops working.

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const FIELDS = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    autoComplete: "name",
    placeholder: "Ada Lovelace",
    rules: { required: "Please enter your name so I know who I'm replying to." },
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    inputMode: "email",
    autoComplete: "email",
    placeholder: "ada@example.com",
    rules: {
      required: "Please enter an email address — it's how I reply.",
      pattern: { value: EMAIL_PATTERN, message: "That doesn't look like an email address. Check for a missing @ or domain." },
    },
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    autoComplete: "off",
    placeholder: "Frontend role at …",
    rules: { required: "Add a short subject so I can triage it." },
  },
  {
    name: "message",
    label: "Message",
    textarea: true,
    autoComplete: "off",
    placeholder: "Tell me about the role, the project, or just say hello.",
    rules: {
      required: "Please write a message.",
      minLength: { value: 5, message: "That's a little short — give me at least a sentence." },
    },
  },
];

// Shared field chrome. The ring rather than a plain border is deliberate:
// --explorerBorder is `transparent` in three of the six themes, so a
// border-explorerBorder input would render edgeless for half of visitors.
const FIELD_CLASS =
  "w-full rounded-xl bg-articleBg px-4 py-3 text-sm text-textColor ring-1 ring-textColor/15 " +
  "placeholder:text-textMuted transition-[box-shadow,background-color] duration-200 " +
  "hover:ring-textColor/25 focus:outline-none focus:ring-2 focus:ring-accentColor " +
  "aria-[invalid=true]:ring-dangerText/70";

export default function ContactForm({ idPrefix = "contact" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", subject: "", message: "" },
    // Errors appear once a field has been left, not on every keystroke, then
    // correct themselves live as the visitor fixes them.
    mode: "onBlur",
    reValidateMode: "onChange",
    // react-hook-form's default, restated because it is load-bearing here:
    // on a failed submit focus jumps to the first invalid field.
    shouldFocusError: true,
  });

  const sendEmail = async (data) => {
    const sendPromise = fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send");
      }
      return res.json();
    });

    toast.promise(sendPromise, {
      loading: "Sending message…",
      success: "Message sent — I'll get back to you soon.",
      error: "That didn't send. Email me directly and I'll pick it up.",
    });

    try {
      await sendPromise;
      reset();
    } catch (e) {
      // The toast already told the visitor, and the direct-email fallback is
      // on screen beside the form. Nothing further to surface here.
      console.error(e);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(sendEmail)} noValidate>
      {FIELDS.map(({ name, label, textarea, rules, ...input }) => {
        const id = `${idPrefix}-${name}`;
        const errorId = `${id}-error`;
        const error = errors[name];
        const Tag = textarea ? "textarea" : "input";

        return (
          <div key={name}>
            {/* A real visible label, not a placeholder standing in for one. A
                placeholder vanishes the moment someone types, which is exactly
                when they most need to know what the field was. */}
            <label
              htmlFor={id}
              className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted"
            >
              {label}
              <span className="ml-1 text-accentColor" aria-hidden="true">*</span>
            </label>

            <Tag
              id={id}
              rows={textarea ? 5 : undefined}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? errorId : undefined}
              className={`${FIELD_CLASS} ${textarea ? "resize-y min-h-32" : "min-h-11"}`}
              {...input}
              {...register(name, rules)}
            />

            {/* The line is always in the layout, empty or not, so an appearing
                error never pushes the rest of the form down the page. */}
            <p
              id={errorId}
              role="alert"
              className="mt-1 min-h-4 text-xs leading-4 text-dangerText"
            >
              {error?.message ?? ""}
            </p>
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accentColor px-8 text-sm font-bold text-mainBg transition-[opacity,scale] duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentColor active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Icon icon="lucide:loader-2" aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
