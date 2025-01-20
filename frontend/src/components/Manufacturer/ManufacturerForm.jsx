import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";
import ManufacturerService from "./ManufacturerService";

export function ManufacturerForm() {
  const { manufacturerId } = useParams();
  const { getUserSession } = useUserSession();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchManufacturer() });
  const onSubmit = async (data) => {
    console.log(data);
    if (manufacturerId) {
      const createdManufacturer =
        await ManufacturerService.updateManufacturerById(
          manufacturerId,
          {
            firmName: data.firmName,
            firmAddress: data.firmAddress,
            dateEstablished: new Date(2002, 10, 14),
            description: data.description,
            price: data.price,
            netWorth: data.netWorth,
            imageUrl: data.imageUrl,
            countriesOfInterest: data.countriesOfInterest.split(","),
          },
          getUserSession(),
        );
      console.log(createdManufacturer);
      navigate(`/manufacturers/${manufacturerId}`);
    } else {
      const createdManufacturer = await ManufacturerService.createManufacturer(
        {
          firmName: data.firmName,
          firmAddress: data.firmAddress,
          dateEstablished: new Date(2002, 10, 14),
          description: data.description,
          price: data.price,
          netWorth: data.netWorth,
          imageUrl: data.imageUrl,
          countriesOfInterest: data.countriesOfInterest.split(","),
        },
        getUserSession(),
      );
      console.log(createdManufacturer);
      navigate(`/manufacturers/${createdManufacturer._id}`);
    }
  };

  async function fetchManufacturer() {
    if (!manufacturerId) {
      return {};
    }
    const manufacturer =
      await ManufacturerService.getManufacturerById(manufacturerId);
    manufacturer.countriesOfInterest =
      manufacturer.countriesOfInterest.join(",");
    console.log(manufacturer);
    return manufacturer;
  }

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Manufacturer form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Firm name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("firmName", { required: true })}
          />
          {errors.firmName && (
            <span className="text-red-600">Firm name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Firm address</label>
          <input
            className="bg-slate-200 p-2"
            {...register("firmAddress", { required: true })}
          />
          {errors.firmAddress && (
            <span className="text-red-600">Firm address is required!</span>
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
          <label className="text-2xl">Net worth</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("netWorth", { required: true })}
          />
          {errors.netWorth && (
            <span className="text-red-600">Net worth is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">
            Countries of interest (comma seperated)
          </label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("countriesOfInterest", { required: true })}
          />
          {errors.countriesOfInterest && (
            <span className="text-red-600">
              Countries of interest are required!
            </span>
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
