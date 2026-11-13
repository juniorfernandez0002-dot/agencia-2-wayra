export function peruPhoto(filename: string): string {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'file:' &&
    typeof document !== 'undefined' &&
    Boolean(document.querySelector('script[src*="./dist/assets/app.bundle.js"]'))
  ) {
    return `./public/images/peru/${filename}`;
  }
  return `./images/peru/${filename}`;
}

export const PERU_MEDIA = {
  machuPicchuClassic: peruPhoto('machu-picchu-classic.jpg'),
  machuPicchuMist: peruPhoto('machu-picchu-mist.jpg'),
  machuPicchuTrain: peruPhoto('machu-picchu-train.jpg'),
  aguasCalientes: peruPhoto('aguas-calientes.jpg'),
  sacsayhuaman: peruPhoto('sacsayhuaman.jpg'),
  cuscoPlaza: peruPhoto('cusco-plaza.jpg'),
  qorikancha: peruPhoto('qorikancha.jpg'),
  sanPedroCusco: peruPhoto('san-pedro-cusco.jpg'),
  pisac: peruPhoto('pisac.jpg'),
  marasSalineras: peruPhoto('maras-salineras.jpg'),
  morayAndenes: peruPhoto('moray-andenes.jpg'),
  ollantaytambo: peruPhoto('ollantaytambo.jpg'),
  vinicunca: peruPhoto('vinicunca.jpg'),
  humantay: peruPhoto('humantay.jpg'),
  ausangate: peruPhoto('ausangate.jpg'),
  raqchi: peruPhoto('raqchi.jpg'),
  arequipaCatalina: peruPhoto('arequipa-catalina.jpg'),
  colcaCondor: peruPhoto('colca-condor.jpg'),
  colcaCanon: peruPhoto('colca-canon.jpg'),
  titicacaUros: peruPhoto('titicaca-uros.jpg'),
  taquile: peruPhoto('taquile.jpg'),
  limaPlaza: peruPhoto('lima-plaza.jpg'),
  mirafloresCosta: peruPhoto('miraflores-costa.jpg'),
  barrancoLima: peruPhoto('barranco-lima.jpg'),
  pachacamac: peruPhoto('pachacamac.jpg'),
  circuitoAguaLima: peruPhoto('circuito-agua-lima.jpg'),
  islasBallestas: peruPhoto('islas-ballestas.jpg'),
  paracasReserva: peruPhoto('paracas-reserva.jpg'),
  playaRojaParacas: peruPhoto('playa-roja-paracas.jpg'),
  huacachina: peruPhoto('huacachina.jpg'),
  nazcaLines: peruPhoto('nazca-lines.jpg'),
  nazcaColibri: peruPhoto('nazca-colibri.jpg'),
  cantalloc: peruPhoto('cantalloc.jpg'),
  tambopataMacaws: peruPhoto('tambopata-macaws.jpg'),
  lagoSandoval: peruPhoto('lago-sandoval.jpg'),
  cevichePeru: peruPhoto('ceviche-peru.jpg')
} as const;
