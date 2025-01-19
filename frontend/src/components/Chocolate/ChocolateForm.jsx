import { useForm } from "react-hook-form";

export function ChocolateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.ingredients = data.ingredients.split(",");
    console.log(data);
  };

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Chocolate form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">Name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Description</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">Description is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Price</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-600">Price is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Net weight</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("netWeight", { required: true })}
          />
          {errors.netWeight && (
            <span className="text-red-600">Net weight is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Cacao percentage</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("cacaoPercentage", { required: true })}
          />
          {errors.cacaoPercentage && (
            <span className="text-red-600">Cacao percentage is required!</span>
          )}
        </div>

        <div className="flex flex-row justify-between">
          <label className="text-2xl">Is vegan</label>
          <input
            type="checkbox"
            className="bg-slate-200 p-2"
            {...register("isVegan")}
          />
        </div>

        <div className="flex flex-row justify-between">
          <label className="text-2xl">Is organic</label>
          <input
            type="checkbox"
            className="bg-slate-200 p-2"
            {...register("isOrganic")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Ingredients (comma seperated)</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("ingredients", { required: true })}
          />
          {errors.ingredients && (
            <span className="text-red-600">Ingredients are required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Image url</label>
          <input
            className="bg-slate-200 p-2"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url are required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white upercase"
          type="submit"
        />
      </form>
    </div>
  );
}
