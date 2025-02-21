import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const Preview = () => {
  const { groupId } = useSelector((state: RootState) => state.form);
  const [forms, setForms] = useState([])

  const pageTwoRef = useRef<HTMLDivElement>(null);
  const pageOneRef = useRef<HTMLDivElement>(null);
  const pageThreeRef = useRef<HTMLDivElement>(null);
  const pageFourRef = useRef<HTMLDivElement>(null);

  async function printOrder() {
    const pages = [pageOneRef, pageTwoRef, pageThreeRef, pageFourRef];

    const pdf = new jsPDF("portrait", "pt", "a4");
    pdf.setFontSize(12);

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i].current;
      if (page) {
        const canvas = await html2canvas(page, {
          scale: 2,
        });
        const imgData = canvas.toDataURL("image/jpeg", 1);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        if (i < pages.length - 1) {
          pdf.addPage();
        }
      }
    }

    pdf.save("order.pdf");
  }

  useEffect(() => {
    async function getForm() {
      if (groupId) {
        const docRef = doc(db, "forms", groupId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const forms = data;
            console.log(forms);
          } else {
            console.log("No such document!");
          }
        });
      }
    }

    getForm();
  }, []);

  return (
    <div className='p-2 md:p-5 flex flex-col'>
      <div className='mb-5 self-stretch flex gap-4 md:gap-8 mx-auto text-white text-sm md:text-lg font-semibold'>
        <Link
          to='..'
          className='rounded-md py-2 px-8 bg-orange-500 transition-all hover:opacity-80 active:scale-95'
        >
          Редактировать
        </Link>
        <button
          className='rounded-md py-2 px-8 bg-[#0066B0] transition-all hover:opacity-80 active:scale-95'
          onClick={printOrder}
        >
          Скачать
        </button>
        {/* <div className='relative'>
					<button className='flex items-center gap-2 rounded-md py-2 px-8 bg-green-600 transition-all hover:opacity-80 active:scale-95'>
						<img src='/share.svg' alt='share' className='w-5 h-5' />
						<span>Поделиться</span>
					</button>
					<ShareDialog />
				</div> */}
      </div>
      <div className='flex flex-col gap-5'>
        <div
          className='max-w-[794px] w-full max-h-[1123px] shadow-xl mx-auto'
          ref={pageOneRef}
        >
          <img
            className='w-full h-full object-contain'
            src='/1.jpg'
            alt='max product info'
          />
        </div>
        <div
          className='flex flex-col max-w-[794px] w-full h-[1123px] shadow-xl mx-auto text-sm'
          ref={pageTwoRef}
        >
          <img
            className='mb-10 self-end w-[60%] max-w-[570px]'
            src='/4.png'
            alt='maxproduct logo illustrator'
          />
          <div className='px-2 md:px-5'>
            <p className='text-[#052338] text-center font-semibold underline'>
              Общество с ограниченной ответственностью
            </p>
            <p className='text-center mb-2'>
              Ташкентская область, г. Ангрен, ул. Умид, 11 р/сч
              20214000700884954001 филиал «КАПИТАЛБАНК» Сергели в г. Ташкент МФО
              01042 ИНН 305570277 ОКЭД 25110
            </p>
            <div className='flex intems-center justify-between mb-2 md:mb-5'>
              <span>№ {generateInvoiceNumber()}</span>
              <span>{formatDate()}</span>
            </div>
            <p className='text-[#052338] text-center font-semibold mb-2 md:mb-5'>
              Коммерческое предложение.
            </p>
            <p className='text-center mb-5'>
              Настоящим письмом выражаем своё почтение и сообщаем, что наше
              предприятие может изготовить и поставить в Ваш адрес нашу
              продукцию согласно нижеследующей таблице
            </p>
            <table className='mb-2 md:mb-5 text-[10px] md:text-sm border border-collapse'>
              <thead>
                <tr className='[&>th]:border [&>th]:border-slate-700 [&>th]:p-1 md:[&>th]:p-2'>
                  <th>№</th>
                  <th>Наименование продукции</th>
                  <th>Ед. изм</th>
                  <th>Тип Металл</th>
                  <th>Толщина металла (верх/вниз) </th>
                  <th>Толщина продукции</th>
                  <th>Кол.во</th>
                  <th>
                    Цена{" "}
                    {searchParams.get("market") === "Foreign" ? "" : "(с НДС)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className='[&>td]:border [&>td]:border-slate-700 [&>td]:text-center md:[&>td]:p-1'
                  >
                    <td>{index + 1}</td>
                    <td>
                      Трёхслойные{" "}
                      {order.type === "roof" ? "кровельные" : "стеновые"}{" "}
                      Сэндвич панели из {convertFillerName(order.filler)}
                    </td>
                    <td>м2</td>
                    <td>ТМЗ</td>
                    <td>
                      <div className='border-b border-b-slate-700 py-2'>
                        {removeFromLeft(order.upperCoverThickness, 2)}мм
                      </div>
                      <div className='py-2'>
                        {removeFromLeft(order.lowerCoverThickness, 2)}мм
                      </div>
                    </td>
                    <td>{removeFromLeft(order.thickness, 1)}мм</td>
                    <td>1</td>
                    <td>{calcPrice(order)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className='text-sm md:font-semibold mb-10'>
              <li>
                Условия оплаты: 100 % предоплата за согласованную партию
                продукции.
              </li>
              <li>
                Порядок поставки нашей продукции в течении{" "}
                <span className='text-red-600'>10 рабочих дней</span> после
                предоплаты.
              </li>
              <li>
                Срок действия коммерческого предложения{" "}
                <span className='text-red-600'>5 дня</span>.
              </li>
              <li>
                Условия поставки –{" "}
                <span className='text-red-600'>Самовывоз</span>.
              </li>
              <li>
                Страна происхождения Республика Узбекистан. Гарантийный срок 12
                месяцев со дня поставки.
              </li>
            </ul>
            <div className='flex text-sm md:text-lg items-center justify-between gap-2'>
              <span>
                С уважением, <br />
                Директор
              </span>
              <div className='flex items-center'>
                <span>Хамиев А.Х.</span>
                <img
                  className='w-full max-w-28'
                  src='/signature.png'
                  alt='signature of director'
                  width={112}
                />
                <img
                  className='w-full max-w-48'
                  src='/stamp.png'
                  alt='company stamp'
                  width={192}
                />
              </div>
            </div>
          </div>
          <div className='mt-auto flex justify-between items-center text-sm md:text-xl font-semibold'>
            <div className='ml-2 md:ml-5 flex items-center gap-2'>
              <img
                src='/headphone.svg'
                alt='headphone'
                width={24}
                height={24}
              />
              <span className='text-[#0066B0]'>
                {manager.slice(0, manager.indexOf("%"))}
              </span>
            </div>
            <div className="flex items-center justify-center w-[60%] max-w-[370px] bg-[url('/5.png')] h-10 md:h-16">
              <span className='text-white -mr-4'>
                {manager.slice(manager.lastIndexOf("%") + 1)}
              </span>
            </div>
          </div>
        </div>
        <div
          className='max-w-[794px] max-h-[1123px] shadow-xl mx-auto'
          ref={pageThreeRef}
        >
          <img
            className='w-full h-full object-cover'
            src='/2.jpg'
            alt='max product info'
          />
        </div>
        <div
          className='max-w-[794px] w-full max-h-[1123px] shadow-xl mx-auto'
          ref={pageFourRef}
        >
          <img
            className='w-full h-full object-contain'
            src='/3.jpg'
            alt='max product info'
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
