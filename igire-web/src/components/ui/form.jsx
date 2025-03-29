"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = ({ children, ...props }) => {
  const methods = useFormContext();

  if (!methods) {
    throw new Error("Form must be wrapped in a FormProvider");
  }

  return (
    <form {...props} onSubmit={methods.handleSubmit(props.onSubmit)}>
      {children}
    </form>
  );
};

const FormField = ({ name, control, render }) => {
  const { control: contextControl } = useFormContext();
  const formControl = control || contextControl;

  if (!formControl) {
    throw new Error("FormField must have control or be wrapped in FormProvider");
  }

  return <Controller name={name} control={formControl} render={render} />;
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef(({ className, children, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const useFormField = () => {
  const fieldContext = React.useContext(FormItemContext);
  const form = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within a FormItem");
  }

  const { id } = fieldContext;

  return {
    id,
    ...form,
  };
};

const FormLabel = React.forwardRef(({ className, htmlFor, ...props }, ref) => {
  const { id } = useFormField();

  return (
    <Label ref={ref} htmlFor={htmlFor || id} className={className} {...props} />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ className, ...props }, ref) => {
  const { id } = useFormField();

  return <Slot ref={ref} id={id} className={className} {...props} />;
});
FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { formState } = useFormContext();
  const { name } = useFormField();
  const error = formState.errors[name]?.message;

  if (!error && !children) {
    return null;
  }

  return (
    <p ref={ref} className={cn("text-sm text-destructive", className)} {...props}>
      {error || children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
