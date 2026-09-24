"use server";

import { supabase } from "@/app/_libs/supabase";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(
  _prevState: unknown,
  formData: FormData,
) {
  // formのname属性ごとにformData.get()で値を取り出すことができる
  const rawFormData = {
    lastname: formData.get("lastname") as string,
    firstname: formData.get("firstname") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // エラー時は values に入力値を入れて返し、フォームに入力内容を戻す
  if (!rawFormData.lastname) {
    return {
      status: "error",
      values: rawFormData,
      message: "姓を入力してください",
    };
  }
  if (!rawFormData.firstname) {
    return {
      status: "error",
      values: rawFormData,
      message: "名を入力してください",
    };
  }
  if (!rawFormData.company) {
    return {
      status: "error",
      values: rawFormData,
      message: "会社名を入力してください",
    };
  }
  if (!rawFormData.email) {
    return {
      status: "error",
      values: rawFormData,
      message: "メールアドレスを入力してください",
    };
  }
  if (!validateEmail(rawFormData.email)) {
    return {
      status: "error",
      values: rawFormData,
      message: "メールアドレスの形式が誤っています",
    };
  }
  if (!rawFormData.message) {
    return {
      status: "error",
      values: rawFormData,
      message: "メッセージを入力してください",
    };
  }

  // contacts テーブルに 1 行追加する
  const { error } = await supabase.from("contacts").insert(rawFormData);

  if (error) {
    console.log(error);
    return {
      status: "error",
      values: rawFormData,
      message: "お問い合わせに失敗しました",
    };
  }

  return { status: "success", message: "OK" };
}
