"use client";

import { useRef, useState, useActionState, useEffect, startTransition } from 'react';
import { AnimatedButton } from '@animations/components/AnimatedButton';
import { Input } from '@components/ui/Input';
import { FormHoneypot } from '@features/newsletters/forms/FormHoneypot';
import { useSpamPrevention } from '@features/newsletters/hooks/useSpamPrevention';
import { submitAccountListing } from '@libs/actions/submitAccountListing';

const TEXTAREA_CLASSES =
  "w-full min-h-[96px] resize-y border border-border bg-surface px-16 py-12 text-body text-foreground placeholder:text-foreground-muted outline-none transition-colors duration-200 ease-out focus:border-foreground";

export function SellAccountForm() {
  const formRef = useRef(null);
  const { checkSpam, enhanceFormData, reset } = useSpamPrevention({ formRef });

  const [state, action, isPending] = useActionState(submitAccountListing, {
    success: false,
    error: ""
  });
  const [localError, setLocalError] = useState(null);
  const [fileCount, setFileCount] = useState(0);

  const onFileChange = (e) => {
    setFileCount(e.target.files?.length ?? 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    const form = formRef.current;
    if (!form) return;

    const spamCheck = checkSpam(form);
    if (spamCheck.isSpam) {
      setLocalError(spamCheck.message);
      return;
    }

    const formData = enhanceFormData(new FormData(form));
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setFileCount(0);
      reset();
    }
  }, [state.success, reset]);

  if (state.success) {
    return (
      <div className="flex flex-col gap-16">
        <p className="text-accent-sm text-brand">Listing submitted</p>
        <h3 className="text-h4">Thanks — we&apos;ll review it shortly</h3>
        <p className="text-body text-foreground/60">
          Every listing is checked before it goes live. We&apos;ll email you once it&apos;s approved.
        </p>
      </div>
    );
  }

  const displayError = localError || state.error || null;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-24">
      <FormHoneypot />

      <div className="grid gap-16 sm:grid-cols-2">
        <Input type="text" name="sellerName" placeholder="Your Name*" required autoComplete="name" />
        <Input type="email" name="sellerEmail" placeholder="Your Email*" required autoComplete="email" />
      </div>

      <div className="grid gap-16 sm:grid-cols-2">
        <Input type="text" name="gameName" placeholder="Game (e.g. Valorant)*" required />
        <Input type="number" name="price" placeholder="Price (USD)*" required min="1" step="0.01" />
      </div>

      <Input
        type="text"
        name="accountTitle"
        placeholder="Listing Title (e.g. Immortal Rank, 50 Skins)*"
        required
      />

      <textarea
        name="description"
        placeholder="Describe the account: rank, skins, level, region, etc."
        className={TEXTAREA_CLASSES}
        rows={4}
      />

      <div className="space-y-8">
        <label htmlFor="screenshots" className="block text-body-sm text-foreground-muted">
          Screenshots* (up to 5 images, 5MB each)
        </label>
        <Input
          id="screenshots"
          type="file"
          name="screenshots"
          accept="image/*"
          multiple
          required
          onChange={onFileChange}
        />
        {fileCount > 0 && (
          <p className="text-body-sm text-foreground-muted">{fileCount} file(s) selected</p>
        )}
      </div>

      <AnimatedButton type="submit" disabled={isPending} theme="brand" className="mt-16 w-full">
        {isPending ? "Submitting..." : "Submit Listing"}
      </AnimatedButton>

      {displayError && <p className="text-body-sm text-brand">{displayError}</p>}
    </form>
  );
}
